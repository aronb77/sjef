'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { redeemLicense } from './actions'
import { Check, AlertCircle, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const initialState = {
    message: null,
    success: false
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="btn-redeem" disabled={pending}>
            {pending ? '...' : <ArrowRight size={16} />}
        </button>
    )
}

export default function RedeemForm() {
    const [state, formAction] = useActionState(redeemLicense, initialState)
    const formRef = useRef(null)

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset()
        }
    }, [state.success])

    return (
        <form ref={formRef} action={formAction} className="redeem-form">
            <div className="redeem-input-wrapper">
                <input
                    type="text"
                    name="code"
                    placeholder="Code invoeren"
                    className="redeem-input"
                    required
                />
                <SubmitButton />
            </div>
            {state.message && (
                <p className={`redeem-message ${state.success ? 'success' : 'error'}`}>
                    {state.success ? <Check size={14} /> : <AlertCircle size={14} />}
                    {state.message}
                </p>
            )}
        </form>
    )
}
