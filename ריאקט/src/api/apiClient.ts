import axios from 'axios';

// const apiClient = axios.create({
//   // החליפי לכתובת שבה השרת שלך רץ (למשל http://localhost:5000)
//   baseURL: 'https://localhost:7030/api', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
const apiClient = axios.create({
  baseURL: 'https://localhost:7030/api',
});
export default apiClient;