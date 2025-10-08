# Test Automatico PWA Ti Presto Genoa
param(
    [string]$Url = "http://localhost:8080"
)

Write-Host "🔴⚪ TEST AUTOMATICO PWA TI PRESTO" -ForegroundColor Red
Write-Host "====================================" -ForegroundColor White
Write-Host "URL di test: $Url" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor White

# Test 1: Verifica disponibilità server
Write-Host "`n🔍 Test 1: Verifica server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $Url -Method HEAD -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Server disponibile (HTTP $($response.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "❌ Server risponde ma con errore: HTTP $($response.StatusCode)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Server non raggiungibile: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Assicurati che il server sia avviato: powershell -File simple-server.ps1" -ForegroundColor Yellow
    exit 1
}

# Test 2: Verifica manifest.json
Write-Host "`n🔍 Test 2: Verifica Web App Manifest..." -ForegroundColor Yellow
try {
    $manifestResponse = Invoke-WebRequest -Uri "$Url/manifest.json" -TimeoutSec 10
    $manifest = $manifestResponse.Content | ConvertFrom-Json
    
    Write-Host "✅ Manifest trovato e valido" -ForegroundColor Green
    Write-Host "   Nome: $($manifest.name)" -ForegroundColor Cyan
    Write-Host "   Nome breve: $($manifest.short_name)" -ForegroundColor Cyan
    Write-Host "   Display: $($manifest.display)" -ForegroundColor Cyan
    Write-Host "   Tema: $($manifest.theme_color)" -ForegroundColor Cyan
    Write-Host "   Icone: $($manifest.icons.Count)" -ForegroundColor Cyan
    Write-Host "   Shortcuts: $($manifest.shortcuts.Count)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Errore caricamento manifest: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Verifica Service Worker
Write-Host "`n🔍 Test 3: Verifica Service Worker..." -ForegroundColor Yellow
try {
    $swResponse = Invoke-WebRequest -Uri "$Url/sw.js" -TimeoutSec 10
    
    if ($swResponse.StatusCode -eq 200) {
        Write-Host "✅ Service Worker disponibile" -ForegroundColor Green
        
        # Analizza contenuto SW
        $swContent = $swResponse.Content
        if ($swContent -match "CACHE_NAME = '([^']+)'") {
            Write-Host "   Versione cache: $($matches[1])" -ForegroundColor Cyan
        }
        
        if ($swContent -match "CACHE_URLS = \[") {
            $cacheUrls = ($swContent -split "`n" | Where-Object { $_ -match "^\s*'/[^']*'," }).Count
            Write-Host "   URLs in cache: $cacheUrls" -ForegroundColor Cyan
        }
        
    } else {
        Write-Host "❌ Service Worker non disponibile" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Errore caricamento Service Worker: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Verifica risorse critiche
Write-Host "`n🔍 Test 4: Verifica risorse critiche..." -ForegroundColor Yellow

$criticalResources = @(
    "/style.css",
    "/script.js",
    "/toast.js", 
    "/pw-simple.js",
    "/logo-ufficiale-genoa-cfc.png"
)

$successCount = 0
foreach ($resource in $criticalResources) {
    try {
        $resourceResponse = Invoke-WebRequest -Uri "$Url$resource" -Method HEAD -TimeoutSec 5
        if ($resourceResponse.StatusCode -eq 200) {
            Write-Host "✅ $resource" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ $resource (HTTP $($resourceResponse.StatusCode))" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $resource (Errore: $($_.Exception.Message))" -ForegroundColor Red
    }
}

$resourceScore = [math]::Round(($successCount / $criticalResources.Count) * 100, 1)
Write-Host "📊 Score risorse: $resourceScore% ($successCount/$($criticalResources.Count))" -ForegroundColor Cyan

# Test 5: Verifica headers PWA
Write-Host "`n🔍 Test 5: Verifica headers PWA..." -ForegroundColor Yellow
try {
    $pageResponse = Invoke-WebRequest -Uri $Url -TimeoutSec 10
    $headers = $pageResponse.Headers
    
    # Controlla Content-Type
    if ($pageResponse.Headers['Content-Type'] -match 'text/html') {
        Write-Host "✅ Content-Type corretto (HTML)" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Content-Type: $($pageResponse.Headers['Content-Type'])" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Errore verifica headers: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Analisi contenuto HTML
Write-Host "`n🔍 Test 6: Analisi contenuto HTML..." -ForegroundColor Yellow
try {
    $htmlResponse = Invoke-WebRequest -Uri $Url -TimeoutSec 10
    $html = $htmlResponse.Content
    
    # Controlla meta tag viewport
    if ($html -match '<meta name="viewport"') {
        Write-Host "✅ Meta viewport presente" -ForegroundColor Green
    } else {
        Write-Host "❌ Meta viewport mancante" -ForegroundColor Red
    }
    
    # Controlla link manifest
    if ($html -match '<link rel="manifest"') {
        Write-Host "✅ Link manifest presente" -ForegroundColor Green
    } else {
        Write-Host "❌ Link manifest mancante" -ForegroundColor Red
    }
    
    # Controlla meta theme-color
    if ($html -match '<meta name="theme-color"') {
        Write-Host "✅ Meta theme-color presente" -ForegroundColor Green
    } else {
        Write-Host "❌ Meta theme-color mancante" -ForegroundColor Red
    }
    
    # Controlla Apple touch icon
    if ($html -match 'apple-mobile-web-app') {
        Write-Host "✅ Meta tag Apple presenti" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Meta tag Apple mancanti" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Errore analisi HTML: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Test immagini
Write-Host "`n🔍 Test 7: Verifica immagini squadre..." -ForegroundColor Yellow
$imageCount = 0
$imageErrors = 0

$squadre = @("genoa", "lazio", "inter", "milan", "juventus", "napoli", "roma", "atalanta", "fiorentina")

foreach ($squadra in $squadre) {
    try {
        $imgResponse = Invoke-WebRequest -Uri "$Url/img/$squadra.png" -Method HEAD -TimeoutSec 3
        if ($imgResponse.StatusCode -eq 200) {
            $imageCount++
        } else {
            $imageErrors++
        }
    } catch {
        $imageErrors++
    }
}

Write-Host "📊 Immagini caricate: $imageCount/$($squadre.Count) (Errori: $imageErrors)" -ForegroundColor Cyan

# Risultato finale
Write-Host "`n🏁 RISULTATO FINALE" -ForegroundColor Magenta
Write-Host "===================" -ForegroundColor White

$totalTests = 7
$passedTests = 0

# Calcola score approssimativo
if ($response.StatusCode -eq 200) { $passedTests++ }
if ($manifest) { $passedTests++ }
if ($swResponse.StatusCode -eq 200) { $passedTests++ }
if ($resourceScore -gt 80) { $passedTests++ }
if ($pageResponse.Headers['Content-Type'] -match 'text/html') { $passedTests++ }
if ($html -match '<meta name="viewport"' -and $html -match '<link rel="manifest"') { $passedTests++ }
if ($imageCount -gt $squadre.Count * 0.7) { $passedTests++ }

$finalScore = [math]::Round(($passedTests / $totalTests) * 100, 1)

if ($finalScore -ge 90) {
    Write-Host "🏆 ECCELLENTE - $finalScore% ($passedTests/$totalTests)" -ForegroundColor Green
    Write-Host "PWA pronta per l'installazione!" -ForegroundColor Green
} elseif ($finalScore -ge 70) {
    Write-Host "⭐ BUONO - $finalScore% ($passedTests/$totalTests)" -ForegroundColor Yellow
    Write-Host "PWA funzionale con possibili miglioramenti" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ DA MIGLIORARE - $finalScore% ($passedTests/$totalTests)" -ForegroundColor Red
    Write-Host "Alcuni problemi da risolvere prima dell'installazione" -ForegroundColor Red
}

Write-Host "`n💡 PROSSIMI PASSI:" -ForegroundColor Cyan
Write-Host "1. Apri Chrome/Edge e vai su $Url" -ForegroundColor White
Write-Host "2. Apri DevTools (F12) > Application > Manifest" -ForegroundColor White
Write-Host "3. Controlla Lighthouse PWA audit" -ForegroundColor White
Write-Host "4. Testa installazione dal menu browser" -ForegroundColor White
Write-Host "5. Usa la pagina di test: $Url/pwa-test.html" -ForegroundColor White

Write-Host "`n🔴⚪ FORZA GENOA! 🔴⚪" -ForegroundColor Red