import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/globals.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
