# Utiliza una imagen oficial de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR C:\Users\aless\OneDrive\Documentos\fnaf-api

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./
COPY index.js ./

# Instala las dependencias
RUN npm install

# Expón el puerto en el que escucha tu aplicación
EXPOSE 80

# Define el comando para ejecutar tu aplicación
CMD [ "node", "index.js" ]
