"use client";

import { type FC, useState } from "react";
import {
  NadaValue,
  NadaValues,
  NamedValue,
  PartyName,
  ProgramBindings,
  ProgramId,
} from "@nillion/client-core";
import { useNilCompute, useNillion } from "@nillion/client-react-hooks";

export const Compute: FC = () => {
  const { client } = useNillion();
  const nilCompute = useNilCompute();
  const [programId, setProgramId] = useState<ProgramId | string>("");
  const [choicePlayer1, setChoicePlayer1] = useState<number>(0);
  const [guessPlayer1, setGuessPlayer1] = useState<number>(0);
  const [choicePlayer2, setChoicePlayer2] = useState<number>(Math.floor(Math.random() * 10));  // Simulated computer choice
  const [guessPlayer2, setGuessPlayer2] = useState<number>(Math.floor(Math.random() * 10));    // Simulated computer guess
  const [copiedComputeOutputID, setCopiedComputeOutputID] = useState(false);

  const handleClick = () => {
    if (!programId) throw new Error("Compute: Program ID required");

    const bindings = ProgramBindings.create(programId)
      .addInputParty(PartyName.parse("Player_1"), client.partyId)
      .addOutputParty(PartyName.parse("Player_1"), client.partyId);

    const values = NadaValues.create()
      .insert(NamedValue.parse("choice_player_1"), NadaValue.createSecretInteger(choicePlayer1))
      .insert(NamedValue.parse("guess_player_1"), NadaValue.createSecretInteger(guessPlayer1))
      .insert(NamedValue.parse("choice_player_2"), NadaValue.createSecretInteger(choicePlayer2))
      .insert(NamedValue.parse("guess_player_2"), NadaValue.createSecretInteger(guessPlayer2));

    nilCompute.execute({ bindings, values });
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Compute</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        placeholder="Program ID"
        value={programId}
        onChange={(e) => setProgramId(e.target.value)}
      />
      
      <div className="mb-4">
        <label className="block mb-2">Player 1 Choice:</label>
        <input
          type="number"
          value={choicePlayer1}
          onChange={(e) => setChoicePlayer1(parseInt(e.target.value))}
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Player 1 Guess:</label>
        <input
          type="number"
          value={guessPlayer1}
          onChange={(e) => setGuessPlayer1(parseInt(e.target.value))}
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
      </div>

      <button
        className={`flex items-center justify-center px-4 py-2 border rounded text-black mb-4 ${
          nilCompute.isLoading || !programId
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={handleClick}
        disabled={nilCompute.isLoading || !programId}
      >
        {nilCompute.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          "Compute"
        )}
      </button>

      <ul className="list-disc pl-5 mt-4">
        <li className="mt-2">Status: {nilCompute.status}</li>
        <li className="mt-2">
          Compute output ID:
          {nilCompute.isSuccess ? (
            <>
              {`${nilCompute.data?.substring(0, 4)}...${nilCompute.data?.substring(nilCompute.data.length - 4)}`}
              <button
                onClick={() => {
                  setCopiedComputeOutputID(true);
                  navigator.clipboard.writeText(nilCompute.data);
                  setTimeout(() => setCopiedComputeOutputID(false), 2000);
                }}
              >
                {!copiedComputeOutputID ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            "idle"
          )}
        </li>
      </ul>
    </div>
  );
};
