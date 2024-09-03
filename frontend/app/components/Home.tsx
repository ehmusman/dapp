import ExploreBtn from "./ExploreBtn";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Connect Your Ethereum Wallet & Verify Your Telegram Identity
            </h1>
            <p className="text-xl mb-8">
              Our DApp allows you to connect your Ethereum wallet and verify your identity with real-time updated data from our Telegram bot. Ensure your username matches on both platforms for seamless access.
            </p>
            <ExploreBtn />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <img
              src="/ethereum.svg"
              alt="Ethereum Wallet"
              className="w-48 h-48"
            />
            <img
              src="/telegram.svg"
              alt="Telegram Bot"
              className="w-48 h-48"
            />
          </div>
          <div className="text-center text-gray-700">
            <p>
              Our DApp connects your Ethereum wallet to verify your identity with real-time updates from our Telegram bot. It ensures that your username matches across both platforms, enhancing security and convenience.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your DApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
