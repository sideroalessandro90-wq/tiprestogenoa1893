# Simple HTTP Server per test mobile
# Avvia un server locale sulla porta 8080

param(
    [int]$Port = 8080
)

Write-Host "TI PRESTO GENOA - SERVER LOCALE" -ForegroundColor Red
Write-Host "Avvio server sulla porta $Port..." -ForegroundColor Yellow

# Crea listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "Server avviato! Premi Ctrl+C per fermare" -ForegroundColor Green

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        Write-Host "$(Get-Date -Format 'HH:mm:ss') $path" -ForegroundColor Cyan
        
        # File da servire
        if ($path -eq "/") {
            $file = "index.html"
        } else {
            $file = $path.TrimStart('/')
        }
        
        if (Test-Path $file) {
            $content = Get-Content $file -Raw -Encoding UTF8
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # MIME type
            $ext = [System.IO.Path]::GetExtension($file)
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css" }
                ".js" { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                ".png" { $response.ContentType = "image/png" }
                ".jpg" { $response.ContentType = "image/jpeg" }
                default { $response.ContentType = "text/plain" }
            }
            
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFound = "404 - File non trovato: $file"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Server fermato" -ForegroundColor Yellow
}