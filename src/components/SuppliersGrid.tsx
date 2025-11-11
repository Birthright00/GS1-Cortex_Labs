import { Supplier } from '../types'
import SupplierCard from './SupplierCard'

interface SuppliersGridProps {
  suppliers: Supplier[]
  onProductClick: (productId: string) => void
  selectedForComparison: Set<string>
  onToggleComparison: (productId: string) => void
}

function SuppliersGrid({ suppliers, onProductClick, selectedForComparison, onToggleComparison }: SuppliersGridProps) {
  return (
    <div className="suppliers-grid">
      {suppliers.map(supplier => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onProductClick={onProductClick}
          selectedForComparison={selectedForComparison}
          onToggleComparison={onToggleComparison}
        />
      ))}
    </div>
  )
}

export default SuppliersGrid
