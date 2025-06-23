from product import Product

class Store:
    def __init__(self):
        self.products = []

    def add_product(self, name, price, unit="pcs", stock="0", category="general"):
        product = Product(name,price,unit, stock, category)
        self.products.append(product)
        print(f"Product '{product.name}' added succesfully.")

    def show_products(self):
        if not self.products:
            print("No products in store.")
        else:
            print("\nAvailable products:")
            for product in self.products:
                print("-", product)


if __name__ == "__main__":
    store = Store()
    store.add_product("milk", 4.5, unit="L", stock=10, category="dairy")
    store.add_product("bread", 2.0, stock=20, category="bakery")
    store.add_product("coffee", 15.0, unit="pack", stock=5, category="drinks")

    store.show_products()
