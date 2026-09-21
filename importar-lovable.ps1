# Script para importar automaticamente o código do Lovable via GitHub
param(
    [string]$RepoUrl
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Importador de Projeto Lovable -> GitHub " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

if (-not $RepoUrl) {
    $RepoUrl = Read-Host "Cole a URL do seu repositorio GitHub (ex: https://github.com/seu-usuario/seu-projeto.git)"
}

$RepoUrl = $RepoUrl.Trim()

if (-not $RepoUrl) {
    Write-Host "Erro: Nenhuma URL foi informada." -ForegroundColor Red
    exit 1
}

Write-Host "`n1. Inicializando configuracao Git..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init -b main | Out-Null
}

# Configura o remote origin
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Host "`n2. Baixando codigo do Lovable do GitHub..." -ForegroundColor Yellow
git fetch origin

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nErro ao conectar com o GitHub. Verifique se o repositorio e publico ou se suas credenciais Git estao configuradas." -ForegroundColor Red
    exit 1
}

# Faz backup preventivo de arquivos que o usuario ja colocou em public/
$tempPublicBackup = $null
if (Test-Path "public") {
    $hasCustomFiles = Get-ChildItem -Path "public" -Recurse -File | Where-Object { $_.Name -ne ".gitkeep" -and $_.Name -ne "README.txt" }
    if ($hasCustomFiles) {
        Write-Host "Detectadas fotos/videos em public/. Salvaguardando seus arquivos..." -ForegroundColor Cyan
        $tempPublicBackup = Join-Path $env:TEMP ("public_backup_" + (Get-Random))
        Copy-Item -Path "public" -Destination $tempPublicBackup -Recurse -Force
    }
}

# Identifica branch padrao (main ou master)
$branch = "main"
$hasMain = git branch -r --list "origin/main"
if (-not $hasMain) {
    $hasMaster = git branch -r --list "origin/master"
    if ($hasMaster) {
        $branch = "master"
    }
}

Write-Host "`n3. Sincronizando arquivos da branch '$branch'..." -ForegroundColor Yellow
git checkout -B $branch "origin/$branch" --force

# Restaura fotos e videos do usuario preservando-os
if ($tempPublicBackup -and (Test-Path $tempPublicBackup)) {
    Write-Host "Restaurando suas fotos e videos na pasta public/..." -ForegroundColor Cyan
    Copy-Item -Path "$tempPublicBackup\*" -Destination "public\" -Recurse -Force
    Remove-Item -Path $tempPublicBackup -Recurse -Force
}

Write-Host "`n4. Instalando dependencias do projeto (npm install)..." -ForegroundColor Yellow
npm install

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  PROJETO IMPORTADO E CONFIGURADO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Para iniciar o site em modo de desenvolvimento, execute:" -ForegroundColor Cyan
Write-Host "  npm run dev`n" -ForegroundColor White

