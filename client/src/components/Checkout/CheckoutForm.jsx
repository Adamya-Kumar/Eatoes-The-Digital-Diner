        <button 
          type="submit" 
          disabled={isSubmitting || !formIsValid}
          className="btn btn-primary btn-lg btn-block place-order-btn"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </button>
