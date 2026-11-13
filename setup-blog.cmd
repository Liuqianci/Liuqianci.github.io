@echo off
setlocal EnableExtensions
pushd "%~dp0" || exit /b 1

rem WinGet installs into these directories. The current CMD may predate the install.
set "PATH=%PATH%;%ProgramFiles%\nodejs;%LOCALAPPDATA%\Pandoc;%ProgramFiles%\Pandoc"
call :ensureTool node.exe OpenJS.NodeJS.LTS 24.14.1 || goto :failed
call :ensureTool pandoc.exe JohnMacFarlane.Pandoc 3.2 --scope user || goto :failed

node --version || goto :failed
pandoc --version || goto :failed
call npm.cmd ci --no-audit --no-fund || goto :failed
call npm.cmd run build || goto :failed
popd
exit /b 0

:ensureTool
where.exe /q "%~1" && exit /b 0
where.exe /q winget.exe || (
  echo Missing %~1. Install %~2 %~3, then run setup-blog.cmd again. 1>&2
  exit /b 1
)
winget.exe install --exact --id %2 --version %3 --source winget %4 %5 --accept-source-agreements --accept-package-agreements || exit /b 1
where.exe /q "%~1" && exit /b 0
echo Could not find %~1 on PATH. Open a new CMD and run setup-blog.cmd again. 1>&2
exit /b 1

:failed
popd
exit /b 1
