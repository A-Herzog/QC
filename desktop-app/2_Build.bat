cd ..
del QC.exe
del QC_Linux_MacOS.zip
call neu.cmd build --release
cd desktop-app
"C:\Program Files (x86)\NSIS\makensis.exe" Launcher.nsi
move QC.exe ..
cd ..
move .\dist\QC-release.zip QC_Linux_MacOS.zip
rmdir /S /Q dist
cd desktop-app