        <Button 
          variant="primary" 
          onClick={onCheckout} 
          disabled={cartItems.length === 0}
          block
        >
          Checkout
        </Button>
