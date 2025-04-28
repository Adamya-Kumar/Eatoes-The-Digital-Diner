      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onRemove(item.id)}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAdd(item)}
      >
        +
      </Button>
