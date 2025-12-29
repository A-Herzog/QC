cd ..
del QC.exe

call neu.cmd build --release --embed-resources

move .\dist\QC\QC-win_x64.exe QC.exe
rmdir /S /Q dist
cd desktop-app