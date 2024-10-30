
from nada_dsl import Party, SecretInteger, Input, Output, Integer

def nada_main():
    # Define Player 1 as the active participant
    player_1 = Party(name="Player_1") 

    # Player 1's choice and guess
    choice_player_1 = SecretInteger(Input(name="choice_player_1", party=player_1))
    guess_player_1 = SecretInteger(Input(name="guess_player_1", party=player_1))

    # Simulated random choice and guess for Player 2 (computer), assigned to Player_1's party
    choice_player_2 = SecretInteger(Input(name="choice_player_2", party=player_1))  
    guess_player_2 = SecretInteger(Input(name="guess_player_2", party=player_1))

    # Calculate the actual sum of choices
    actual_sum = choice_player_1 + choice_player_2

    # Determine points for each player based on correct guesses
    player_1_points = (guess_player_1 == actual_sum).if_else(Integer(1), Integer(0))
    player_2_points = (guess_player_2 == actual_sum).if_else(Integer(1), Integer(0))

    # Determine the round winner based on points
    round_winner = (
        (player_1_points > player_2_points).if_else(Integer(1), 
            (player_2_points > player_1_points).if_else(Integer(2), Integer(0))
        )
    )

    # Output the results for the round:
    out = Output(round_winner, "round_winner", player_1)

    return [out]

