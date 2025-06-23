class Product:
    def __init__(self, name, price, unit="pcs", stock=0, category="general"):
        self.name = name
        self.price = price
        self.unit = unit
        self.stock = stock
        self.category = category

    def __str__(self):
        return f"{self.name.capitalize()} - {self.price} per {self.unit} ({self.stock} in stock)"
    

