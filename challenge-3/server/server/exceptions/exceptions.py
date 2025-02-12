
class CustomException:
    
    def __init__(self, context: str, message: str, status_code):
        self.context = "" + f" > {context}"
        self.message = message
        self.status_code = status_code