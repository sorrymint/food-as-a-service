import React, { useState } from 'react'
import { MenuIcon } from 'lucide-react';
import { X } from 'lucide-react';


const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);
  return (
    <div>
        {!open ? (
            <MenuIcon size={28} absoluteStrokeWidth={false} onClick={() => setOpen(true)}/>
        ) :
        (
          <X size={28}  onClick={() => setOpen(false)}/> 
        )}

    </div>
  )
}

export default HamburgerMenu