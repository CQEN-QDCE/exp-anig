# Installer le bc wallet
1. Cloner le dépôt https://github.com/CQEN-QDCE/portefeuille-mobile-qc
2. Accéder au répertoire: cd portfeuille-mobile-qc
3. Récupérer les sous modules du projet: git submodule update --init --recursive
4. Vérifier la version npm: npm --v (La version version doitêtre 8.5.x)
5. Vérifier la version de Node: node -v (La version doit être 16.14.x)
6. Au besoin, installer nvm (node version manager) pour installer la bonner version de Node
7. Accéder le répertoire app: cd app
8. installer les node_modules: npm ci
9. démarrer metro: npm start
10. 
