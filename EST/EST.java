import java.util.*;
class OrderFacade{
    private int stock;
    private final boolean isPaymentDone;
    private final boolean isEmailsent;
    public OrderFacade(int stock, boolean isPaymentDone, boolean isEmailsent){
        this.stock = stock;
        this.isPaymentDone = isPaymentDone;
        this.isEmailsent = isEmailsent;
    }
    boolean isStockAvailable(int qty){
        return stock >= qty; 
    } 
    boolean processPayment(){
        return isPaymentDone;
    }
    boolean sendEmail(){
        return isEmailsent;
    }
    void decrementStock(int qty){
        stock -= qty;
    }
    boolean placeOrder(int qty){
        if(isStockAvailable(qty) && processPayment() && sendEmail()){
            decrementStock(qty);
            return true;
        }
        return false;
    }

};
public class est {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the quantity to order: ");
        int qty = sc.nextInt();
        OrderFacade order = new OrderFacade(10, true, true);
        if(order.placeOrder(qty)){
            System.out.println("Order placed successfully!");
        } else {
            System.out.println("Failed to place order.");
        }
        sc.close();
    }
}
