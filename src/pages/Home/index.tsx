import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { createContext, useState } from "react"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

interface Cycle {
    id:string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds:number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    /* exportando a tipagem inferida pelo Zod da minha Task e minutesAmount */

   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60, 'O intervalo deve ser de 5 a 60 minutos'),
    })

    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    /* Criando novos ciclos */
    function handleCreateNewCycle(data: NewCycleFormData ){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)

        reset()

    }

    function handleInterruptCycle() {
        setCycles( state =>
            state.map((cycle) =>{
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }),
        )
        setActiveCycleId(null)
    }

    function setSecondsPassed(seconds: number){
        setSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles( state =>
            state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }),
        )
    }

   const task = watch('task')
   const isSubmitDisabled = !task
   
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
              <CyclesContext.Provider 
              value={{ 
                 activeCycle,
                 activeCycleId, 
                 markCurrentCycleAsFinished, 
                 amountSecondsPassed,
                 setSecondsPassed
                 }}>

                <FormProvider {...newCycleForm}>
                <NewCycleForm />
                </FormProvider>
                <Countdown />
              </CyclesContext.Provider>
            </form>

                { activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} disabled={isSubmitDisabled} type="button">
                    <HandPalm size={24}/>
                    Interromper
                </StopCountdownButton>
                ): (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Comerçar
                </StartCountdownButton>
                )}
        </HomeContainer>
    )
}