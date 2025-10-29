import { Supplier } from '../types'
import SupplierCard from './SupplierCard'

interface SuppliersGridProps {
  suppliers: Supplier[]
  onProductClick: (productId: string) => void
}

function SuppliersGrid({ suppliers, onProductClick }: SuppliersGridProps) {
  return (
    <div className="suppliers-grid">
      {suppliers.map(supplier => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  )
}

export default SuppliersGrid
