import { Play } from "phosphor-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style"


export function Home(){
    
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'informe a tarefa'),
        minutesAmount: zod.number().min(5).max(60, 'O intervalo deve ser de 5 a 60 minutos'),
    })

    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    /* exportando a tipagem inferida pelo Zod da minha Task e minutesAmount */

   type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    function handleCreateNewCycle(data: NewCycleFormData ){
        console.log(data)
    }


   const task = watch('task')
   const isSubmitDisabled = !task
   
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput 
                    id="task"
                    placeholder="Dê um nome para o seu projeto"
                    list="task-suggestions"
                    {...register('task')}
                />
            
            <datalist id="task-suggestions">
                <option value=""/>
            </datalist>

                <label htmlFor="minutesAmount">Durante</label>
                <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount"
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', {valueAsNumber: true})}
                />

                <span>minutos.</span>
            </FormContainer>

            <CountdownContainer>
                <span>0</span>
                <span>0</span>
                <Separator>:</Separator>
                <span>0</span>
                <span>0</span>
            </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Comerçar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}