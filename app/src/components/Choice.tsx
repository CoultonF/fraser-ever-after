import {BrideIcon} from "./BrideIcon.tsx";
import {GroomIcon} from "./GroomIcon.tsx";

export const  Choice = ({choices, inviteId, triviaId}: {triviaId:number ,inviteId:string,choices: {choice: string, choice_id: number}[]}) => {

  const submitChoice = async (choiceData: any) => {
    try {
      await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/trivia/${inviteId}`, {
        method: 'POST',
        body: JSON.stringify(choiceData),
      });
    } catch (e) {
      alert(JSON.stringify(e));
      console.error(e)
    }
  };
  const handleClick = async (choiceId: number) => {
    try{
      await submitChoice({choice_id: choiceId, trivia_id: triviaId});
    }
    catch (e) {
      alert(JSON.stringify(e));
      console.error(e)
    }
    window.location.reload();
  }
  if(choices)
  return (
    <>
                        {choices && choices.map(choice => {
                          if (choice.choice.toLowerCase() === 'bride') {
                            return (
                              <button key={choice.choice_id} type="button" onClick={()=> handleClick(choice.choice_id)} title="Bride" className="cursor-pointer overflow-clip hover:opacity-70 hover:bg-pink-100 hover:border-2 border border-black h-14 w-14 rounded-full drop-shadow-md bg-white">
                                <BrideIcon />
                              </button>
                            );
                          } else {
                            return (
                              <button key={choice.choice_id} type="button" onClick={()=> handleClick(choice.choice_id)} title="Groom" className="cursor-pointer overflow-clip hover:opacity-70 hover:bg-blue-100 hover:border-2 border border-black h-14 w-14 rounded-full drop-shadow-md bg-white">
                                <GroomIcon />
                              </button>
                            );
                          }
                        })}
    </>
  )
}
