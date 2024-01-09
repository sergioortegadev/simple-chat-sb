import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sin CORS en backend ponemos un server proxy en front, diciéndole al front que ambos están en el mismo servidor, para esto poner en el front, en app.jsx io('/') para que busque la conexion en el mismo servidor. O también io(), ya que sin parámetros, o sea por defecto busca en el mismo server. Luego aquí en vite.config le decimos que lo busque en otra dirección mediante proxy.
  /* server: {
    proxy: {
      '/socket.io': {
        //target: 'https://stackblitzstartersblauzx-3l4o--4000--a2aabdd9.local-credentialless.webcontainer.io/',
        target: 'http://localhost:4000',
        ws: true,
      },
    },
  }, */
});
