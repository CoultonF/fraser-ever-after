import React from "react"
import { inviteAtom } from "./inviteStore.ts"

function InviteState ({invite}: {invite:string}){
  React.useEffect(()=>{
    inviteAtom.set(invite)
  },[])
  return <></>
}

export {InviteState}