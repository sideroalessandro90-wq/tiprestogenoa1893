# 🚀 Script Deploy Automatico - Ti Presto
# Uso: .\auto-deploy.ps1 "messaggio commit"

param(
    [string]$CommitMessage = "🚀 Deploy automatico: aggiornamenti sito"
)

Write-Host "🎯 INIZIO DEPLOY AUTOMATICO TI PRESTO" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Verifica se siamo nella directory corretta
if (!(Test-Path "index.html")) {
    Write-Host "❌ ERRORE: Non trovato index.html. Assicurati di essere nella directory del progetto." -ForegroundColor Red
    exit 1
}

# Verifica status Git
Write-Host "📋 Verifico status Git..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "✅ Trovate modifiche da committare" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Nessuna modifica trovata" -ForegroundColor Blue
}

# Aggiungi tutti i file
Write-Host "📁 Aggiungo tutti i file modificati..." -ForegroundColor Yellow
git add .

# Verifica se ci sono file staged
$stagedFiles = git diff --cached --name-only
if ($stagedFiles) {
    Write-Host "✅ File staged per commit:" -ForegroundColor Green
    $stagedFiles | ForEach-Object { Write-Host "   - $_" -ForegroundColor Cyan }
    
    # Commit
    Write-Host "💾 Creo commit..." -ForegroundColor Yellow
    git commit -m $CommitMessage
    
    # Push
    Write-Host "📤 Push su GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PUSH COMPLETATO CON SUCCESSO!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 DEPLOY IN CORSO SU VERCEL..." -ForegroundColor Magenta
        Write-Host "   Il deploy automatico si attiverà tra pochi secondi"
        Write-Host ""
        Write-Host "🌐 URL Sito: https://ti-presto-genoa.vercel.app" -ForegroundColor Cyan
        Write-Host "📊 Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📱 Testa il sito mobile dopo il deploy!" -ForegroundColor Yellow
    } else {
        Write-Host "❌ ERRORE durante il push" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ℹ️ Nessun file da committare" -ForegroundColor Blue
}

Write-Host ""
Write-Host "🎉 DEPLOY AUTOMATICO COMPLETATO!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green