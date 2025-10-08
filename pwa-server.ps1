# Server HTTP PowerShell per test PWA Ti Presto
param(
    [int]$Port = 8080,
    [string]$DocumentRoot = "."
)

Write-Host "🔴⚪ TI PRESTO PWA TEST SERVER" -ForegroundColor Red
Write-Host "=================================" -ForegroundColor White
Write-Host "Avvio server HTTP locale per test PWA..." -ForegroundColor Green
Write-Host "Porta: $Port" -ForegroundColor Green
Write-Host "Directory: $(Resolve-Path $DocumentRoot)" -ForegroundColor Green
Write-Host "URL: http://localhost:$Port" -ForegroundColor Yellow
Write-Host "URL Test PWA: http://localhost:$Port/pwa-test.html" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor White

try {
    # Crea listener HTTP
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
    
    Write-Host "Server avviato con successo!" -ForegroundColor Green
    Write-Host "Premi Ctrl+C per interrompere" -ForegroundColor Yellow
    Write-Host ""
    
    # Ottieni i file MIME types
    $mimeTypes = @{
        '.html' = 'text/html; charset=utf-8'
        '.css' = 'text/css'
        '.js' = 'application/javascript'
        '.json' = 'application/json'
        '.png' = 'image/png'
        '.jpg' = 'image/jpeg'
        '.gif' = 'image/gif'
        '.ico' = 'image/x-icon'
        '.svg' = 'image/svg+xml'
        '.woff' = 'font/woff'
        '.woff2' = 'font/woff2'
        '.ttf' = 'font/ttf'
        '.eot' = 'application/vnd.ms-fontobject'
    }
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $url = $request.Url.LocalPath
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - $($request.HttpMethod) $url" -ForegroundColor Cyan
        
        # Converti URL in percorso file
        if ($url -eq "/") {
            $filePath = Join-Path $DocumentRoot "index.html"
        } else {
            $filePath = Join-Path $DocumentRoot $url.TrimStart('/')
        }
        
        # Risolvi percorso relativo
        $filePath = Resolve-Path $filePath -ErrorAction SilentlyContinue
        
        if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
            try {
                # Leggi file
                $content = [System.IO.File]::ReadAllBytes($filePath)
                
                # Imposta MIME type
                $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mimeType = $mimeTypes[$extension]
                if (-not $mimeType) {
                    $mimeType = 'application/octet-stream'
                }
                
                $response.ContentType = $mimeType
                $response.ContentLength64 = $content.Length
                $response.StatusCode = 200
                
                # Headers per PWA
                $response.Headers.Add("Cache-Control", "public, max-age=31536000")
                $response.Headers.Add("Service-Worker-Allowed", "/")
                
                # Scrivi contenuto
                $response.OutputStream.Write($content, 0, $content.Length)
                
                Write-Host "    200 OK ($($content.Length) bytes)" -ForegroundColor Green
                
            } catch {
                Write-Host "    Errore lettura file: $($_.Exception.Message)" -ForegroundColor Red
                $response.StatusCode = 500
                $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("Internal Server Error")
                $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
            }
        } else {
            Write-Host "    404 Not Found" -ForegroundColor Red
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }
        
        $response.Close()
    }
    
} catch {
    Write-Host "Errore server: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Message -like "*access is denied*") {
        Write-Host "Suggerimento: Prova ad eseguire PowerShell come Amministratore" -ForegroundColor Yellow
        Write-Host "oppure usa una porta diversa: .\pwa-server.ps1 -Port 8081" -ForegroundColor Yellow
    }
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        Write-Host "Server arrestato." -ForegroundColor Yellow
    }
}