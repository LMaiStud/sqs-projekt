# Stage 1: Build the React application
FROM node:14-alpine as build

WORKDIR /app

# Kopieren Sie die `package.json`-Datei und die `package-lock.json`-Datei (falls vorhanden)
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Codes
COPY . .

# Bauen Sie die Anwendung
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Kopieren Sie den gebauten React-Code aus der vorherigen Stufe in das Nginx-HTML-Verzeichnis
COPY --from=build /app/dist /usr/share/nginx/html

# Exponieren Sie den Port, den Nginx verwenden wird (normalerweise Port 80)
EXPOSE 80

# Starten Sie Nginx im Vordergrund, wenn der Container gestartet wird
CMD ["nginx", "-g", "daemon off;"]
