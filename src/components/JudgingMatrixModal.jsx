import React from 'react'
import { FieldManualModal } from './FieldManualModal'

// Re-export FieldManualModal as JudgingMatrixModal for backward compatibility
export function JudgingMatrixModal(props) {
  return <FieldManualModal {...props} />
}

export default JudgingMatrixModal
