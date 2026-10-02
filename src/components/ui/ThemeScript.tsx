// Dijalankan sebelum paint agar tema tersimpan langsung terpasang tanpa kedipan.
// Default selalu light; dark hanya jika pengunjung memilihnya lewat ThemeToggle.
const script = `(function(){try{var d=localStorage.getItem("theme")==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
