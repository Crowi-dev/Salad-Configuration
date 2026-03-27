export default function Footer() {
    return(
        <footer className="bg-[#A2D135] text-black p-8 mt-12 w-full flex flex-wrap justify-around items-start">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Contact</h3>
        <p>123 Demo Street</p>
        <p>hello@example.com</p>
        <p>(123) 456-7890</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Social Media</h3>
        <p className="hover:underline cursor-pointer">X</p>
        <p className="hover:underline cursor-pointer">Instagram</p>
        <p className="hover:underline cursor-pointer">LinkedIn</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Branding</h3>
        <p>Fresh Food Factory</p>
        <p>Your Fresh Salad</p>
      </div>
    </footer>
    );
}