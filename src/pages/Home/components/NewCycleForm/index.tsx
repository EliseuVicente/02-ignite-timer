import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm(){
    return (
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput 
                    id="task"
                    placeholder="Dê um nome para o seu projeto"
                    list="task-suggestions"
                    disabled={!!activeCycle}
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
                    disabled={!!activeCycle}
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', {valueAsNumber: true})}
                />

                <span>minutos</span>
            </FormContainer>
       )     
        }