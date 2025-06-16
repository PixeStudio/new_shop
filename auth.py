import json

class User:
    def __init__(self, username, password, history=None, role="user"):
        self.username = username
        self.password = password
        self.history = history if history is not None else[]
        self.role = role

    def show_history(self):
        if self.history:
            print(f"Historia zakupów dla użytkownika {self.username}:{self.history}")
        else:
            print(f"Użytkownik {self.username} nie ma jeszcze historii zakupów.")

def load_users_from_json(filename):
    user_dict = {}

    try:
        with open(filename, "r", encoding="utf8") as file:
            data = json.load(file)
            for username, user_data in data.items():
                user = User(username=username,
                            password=user_data.get("password", ""),
                            history=user_data.get("history", []),
                            role=user_data.get("role", "user"))
            user_dict[username] = user
    
    except FileNotFoundError:
        print(f"File {filename} not found!")
        return user_dict

