import React from "react";
import { useProfileState } from "./hooks/useProfileState";
import { useWalletHandler } from "./hooks/useWalletHandler";

const Profile = () => {
  const { email, username, telegramBotData } = useProfileState();
  const { connectMetaMaskWalletHandler, disconnectWallet, state } =
    useWalletHandler();
  return (
    <section className="container mx-auto my-5">
      <div className="flex flex-wrap justify-between mt-10">
        {/* Profile Section */}
        <aside className="w-full md:w-1/3 p-5">
          <div className="mt-10">
            <label
              htmlFor="email"
              className="block text-xl font-semibold text-secondary"
            >
              Email:
            </label>
            <span className="bg-transparent text-secondary text-xl font-sans mt-2">
              {" "}
              {email}
            </span>
          </div>
          <div className="mt-10">
            <label
              htmlFor="email"
              className="block text-xl font-semibold text-secondary"
            >
              Username:
            </label>
            <span className="bg-transparent text-secondary text-xl font-sans mt-2">
              {" "}
              {username}
            </span>
          </div>
          {state?.address ? (
            <button
              disabled={state?.isConnecting}
              onClick={disconnectWallet}
              className={` ${
                state?.isConnecting ? "bg-opacity-50" : ""
              } px-5 py-2 bg-primary text-white font-semibold font-sans rounded-lg text-xl w-full`}
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              disabled={state?.isConnecting}
              onClick={connectMetaMaskWalletHandler}
              className={` ${
                state?.isConnecting ? "bg-opacity-50" : ""
              } px-5 py-2 bg-primary text-white font-semibold font-sans rounded-lg text-xl w-full`}
            >
              Connect Wallet
            </button>
          )}
          {state?.address ? (
            <table className="border-2 border-secondary border-collapse my-5 font-sans text-lg w-full">
              <tbody>
                <tr className="border-2 border-secondary">
                  <td className="border-2 border-secondary p-2">Address</td>
                  <td className="border-2 border-secondary p-2">
                    {state?.address}
                  </td>
                </tr>
                <tr className="border-2 border-secondary">
                  <td className="border-2 border-secondary p-2">Balance</td>
                  <td className="border-2 border-secondary p-2">
                    {state?.balance}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </aside>

        {/* Chat Bubble Section */}
        {telegramBotData?.length ? (
          <section className="w-full md:w-2/3 p-5">
            <div className="flex flex-col items-end rounded-2xl shadow-2xl drop-shadow-2xl border-t border-secondary p-5 max-h-96 overflow-x-auto no-scrollbar">
              {telegramBotData?.map((botData) => (
                <div
                  key={botData?.update_id}
                  className="bubble border-2 border-secondary w-96 p-5 text-primary font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all"
                >
                  {botData?.text}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
};

export default  Profile;
