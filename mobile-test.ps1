# Mobile Test Script per Ti Presto Genoa 1893
# Testa le ottimizzazioni mobile implementate

param(
    [switch]$OpenBrowser = $true,
    [switch]$RunTests = $true,
    [switch]$Verbose = $false
)

Write-Host "🔴⚪ MOBILE TEST - Ti Presto Genoa 1893" -ForegroundColor Red
Write-Host "=" * 50

# Colori per l'output
$RED = "Red"
$GREEN = "Green" 
$YELLOW = "Yellow"
$CYAN = "Cyan"
$WHITE = "White"

function Write-TestResult {
    param(
        [string]$TestName,
        [string]$Result,
        [string]$Status = "INFO"
    )
    
    $color = switch ($Status) {
        "PASS" { $GREEN }
        "FAIL" { $RED }
        "WARN" { $YELLOW }
        default { $WHITE }
    }
    
    $statusIcon = switch ($Status) {
        "PASS" { "[PASS]" }
        "FAIL" { "[FAIL]" }
        "WARN" { "[WARN]" }
        default { "[INFO]" }
    }
    
    Write-Host "$statusIcon $TestName" -ForegroundColor $color -NoNewline
    Write-Host ": $Result" -ForegroundColor White
}

# Test 1: Verifica file esistenti
Write-Host "`n📁 VERIFICA FILE" -ForegroundColor Cyan
Write-Host "-" * 20

$requiredFiles = @(
    "index.html",
    "style.css", 
    "script.js",
    "mobile-test.html",
    "manifest.json"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-TestResult "File $file" "Presente" "PASS"
    } else {
        Write-TestResult "File $file" "Mancante" "FAIL"
    }
}

# Test 2: Verifica ottimizzazioni CSS
Write-Host "`n🎨 VERIFICA CSS MOBILE" -ForegroundColor Cyan
Write-Host "-" * 25

if (Test-Path "style.css") {
    $cssContent = Get-Content "style.css" -Raw
    
    # Test media queries
    if ($cssContent -match "@media.*max-width.*768px") {
        Write-TestResult "Media Query Mobile (768px)" "Presente" "PASS"
    } else {
        Write-TestResult "Media Query Mobile (768px)" "Mancante" "FAIL"
    }
    
    if ($cssContent -match "@media.*max-width.*480px") {
        Write-TestResult "Media Query Ultra Mobile (480px)" "Presente" "PASS"
    } else {
        Write-TestResult "Media Query Ultra Mobile (480px)" "Mancante" "FAIL"
    }
    
    # Test hamburger menu
    if ($cssContent -match "mobile-menu-toggle" -or $cssContent -match "hamburger") {
        Write-TestResult "Menu Hamburger CSS" "Presente" "PASS"
    } else {
        Write-TestResult "Menu Hamburger CSS" "Mancante" "WARN"
    }
    
    # Test touch optimization
    if ($cssContent -match "touch-action" -or $cssContent -match "44px") {
        Write-TestResult "Ottimizzazioni Touch" "Presente" "PASS"
    } else {
        Write-TestResult "Ottimizzazioni Touch" "Mancante" "WARN"
    }
    
    # Conta righe CSS
    $cssLines = ($cssContent -split "`n").Count
    Write-TestResult "Righe CSS Totali" "$cssLines righe" "INFO"
    
} else {
    Write-TestResult "File style.css" "Non trovato" "FAIL"
}

# Test 3: Verifica JavaScript mobile
Write-Host "`n⚡ VERIFICA JAVASCRIPT MOBILE" -ForegroundColor Cyan
Write-Host "-" * 30

if (Test-Path "script.js") {
    $jsContent = Get-Content "script.js" -Raw
    
    # Test funzioni mobile
    $mobileFunctions = @(
        "initializeMobileMenu",
        "toggleMobileMenu", 
        "openMobileMenu",
        "closeMobileMenu",
        "initializeMobileOptimizations"
    )
    
    foreach ($func in $mobileFunctions) {
        if ($jsContent -match $func) {
            Write-TestResult "Funzione $func" "Presente" "PASS"
        } else {
            Write-TestResult "Funzione $func" "Mancante" "WARN"
        }
    }
    
} else {
    Write-TestResult "File script.js" "Non trovato" "FAIL"
}

# Test 4: Verifica HTML mobile
Write-Host "`n🌐 VERIFICA HTML MOBILE" -ForegroundColor Cyan  
Write-Host "-" * 25

if (Test-Path "index.html") {
    $htmlContent = Get-Content "index.html" -Raw
    
    # Test viewport meta tag
    if ($htmlContent -match 'name="viewport".*width=device-width') {
        Write-TestResult "Viewport Meta Tag" "Presente" "PASS"  
    } else {
        Write-TestResult "Viewport Meta Tag" "Mancante o Incompleto" "FAIL"
    }
    
    # Test PWA manifest
    if ($htmlContent -match 'rel="manifest"') {
        Write-TestResult "PWA Manifest Link" "Presente" "PASS"
    } else {
        Write-TestResult "PWA Manifest Link" "Mancante" "WARN"
    }
    
    # Test mobile menu button
    if ($htmlContent -match "mobile-menu-toggle" -or $htmlContent -match "hamburger") {
        Write-TestResult "Pulsante Menu Mobile" "Presente" "PASS"
    } else {
        Write-TestResult "Pulsante Menu Mobile" "Mancante" "WARN"
    }
    
} else {
    Write-TestResult "File index.html" "Non trovato" "FAIL"
}

# Test 5: Controllo dimensioni file
Write-Host "`n📊 ANALISI DIMENSIONI FILE" -ForegroundColor Cyan
Write-Host "-" * 30

$files = @("index.html", "style.css", "script.js")
foreach ($file in $files) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        $sizeKB = [math]::Round($size / 1KB, 2)
        
        $status = if ($sizeKB -lt 100) { "PASS" } elseif ($sizeKB -lt 500) { "WARN" } else { "FAIL" }
        Write-TestResult "Dimensione $file" "$sizeKB KB" $status
    }
}

# Test 6: Verifica connettività live site
Write-Host "`n🌍 TEST CONNETTIVITÀ SITO LIVE" -ForegroundColor Cyan
Write-Host "-" * 35

try {
    $response = Invoke-WebRequest -Uri "https://www.tiprestogenoa1893.it/" -Method Head -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-TestResult "Sito Live Accessibile" "Online (HTTP $($response.StatusCode))" "PASS"
    } else {
        Write-TestResult "Sito Live Accessibile" "Status Code $($response.StatusCode)" "WARN"  
    }
} catch {
    Write-TestResult "Sito Live Accessibile" "Errore connessione" "FAIL"
    if ($Verbose) {
        Write-Host "   Errore: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 7: Controllo Performance CSS
Write-Host "`n🚀 ANALISI PERFORMANCE" -ForegroundColor Cyan
Write-Host "-" * 25

if (Test-Path "style.css") {
    $cssContent = Get-Content "style.css" -Raw
    
    # Conta regole CSS critiche per mobile
    $mediaQueries = ([regex]::Matches($cssContent, "@media")).Count
    $mobileRules = ([regex]::Matches($cssContent, "max-width.*768px|max-width.*480px")).Count
    
    Write-TestResult "Media Queries Totali" "$mediaQueries" "INFO"
    Write-TestResult "Regole Mobile Specifiche" "$mobileRules" "INFO"
    
    # Verifica CSS critici
    $criticalCSS = @("font-size", "padding", "margin", "display", "position")
    $criticalCount = 0
    
    foreach ($prop in $criticalCSS) {
        $matches = ([regex]::Matches($cssContent, $prop)).Count
        $criticalCount += $matches
    }
    
    Write-TestResult "Proprietà CSS Critiche" "$criticalCount occorrenze" "INFO"
}

# Avvio server di test locale se richiesto
if ($RunTests) {
    Write-Host "`n🖥️ AVVIO SERVER DI TEST" -ForegroundColor Cyan
    Write-Host "-" * 25
    
    try {
        # Prima controlla se esiste già un server in ascolto
        $existingProcess = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
        
        if ($existingProcess) {
            Write-TestResult "Server Locale" "Già in esecuzione sulla porta 8080" "PASS"
        } else {
            Write-TestResult "Server Locale" "Avvio in corso..." "INFO"
            
            # Avvia server in background
            $serverJob = Start-Job -ScriptBlock {
                cd $using:PWD
                python -m http.server 8080 2>$null
            }
            
            # Aspetta un momento per l'avvio
            Start-Sleep -Seconds 2
            
            # Verifica se il server è avviato
            try {
                $testResponse = Invoke-WebRequest -Uri "http://localhost:8080" -Method Head -TimeoutSec 5
                Write-TestResult "Server Locale" "Avviato su http://localhost:8080" "PASS"
            } catch {
                Write-TestResult "Server Locale" "Errore avvio" "FAIL"
            }
        }
    } catch {
        Write-TestResult "Server Locale" "Errore configurazione" "FAIL"
    }
}

# Apertura browser per test
if ($OpenBrowser) {
    Write-Host "`n🌐 APERTURA BROWSER PER TEST" -ForegroundColor Cyan
    Write-Host "-" * 35
    
    $urls = @(
        @{name="Test Mobile Locale"; url="http://localhost:8080/mobile-test.html"},
        @{name="Sito Principale Locale"; url="http://localhost:8080/index.html"},
        @{name="Sito Live"; url="https://www.tiprestogenoa1893.it/"}
    )
    
    foreach ($urlInfo in $urls) {
        try {
            Write-TestResult "Apertura $($urlInfo.name)" "Avvio browser..." "INFO"
            Start-Process $urlInfo.url
            Start-Sleep -Seconds 1
        } catch {
            Write-TestResult "Apertura $($urlInfo.name)" "Errore" "FAIL"
        }
    }
}

# Riassunto finale
Write-Host "`n" + "=" * 50
Write-Host "🔴⚪ RIEPILOGO TEST MOBILE - TI PRESTO GENOA" -ForegroundColor Red
Write-Host "=" * 50

Write-Host "`n📋 ISTRUZIONI PROSSIMI PASSI:" -ForegroundColor Yellow
Write-Host "1. ✅ Testa il sito su dispositivi mobili reali"
Write-Host "2. 🔧 Usa DevTools per simulare diversi dispositivi"  
Write-Host "3. 📱 Verifica la funzionalità del menu hamburger"
Write-Host "4. 👆 Testa i touch targets e le interazioni"
Write-Host "5. 🚀 Carica le ottimizzazioni sul server live"

Write-Host "`n🌐 URL DI TEST:" -ForegroundColor Cyan
Write-Host "• Test Mobile: http://localhost:8080/mobile-test.html"
Write-Host "• Sito Locale: http://localhost:8080/index.html"  
Write-Host "• Sito Live: https://www.tiprestogenoa1893.it/"

Write-Host "`n📱 PER TESTARE SU MOBILE:" -ForegroundColor Green
Write-Host "• DevTools → Toggle Device Toolbar (Ctrl+Shift+M)"
Write-Host "• Seleziona iPhone/Android/iPad"
Write-Host "• Testa orientamento portrait/landscape"
Write-Host "• Verifica touch interactions"

Write-Host "`n🔧 DEBUG TOOLS:" -ForegroundColor Magenta  
Write-Host "• Console: Ctrl+Shift+J"
Write-Host "• Network Tab: analizza caricamento CSS/JS"
Write-Host "• Performance Tab: misura velocità"
Write-Host "• Lighthouse: audit mobile performance"

Write-Host "`nTest completato! 🏁" -ForegroundColor Green