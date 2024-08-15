import React from 'react'

export default function Header() {
  return (
    <div className="m-5">
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h3 className="text-slate-900 dark:text-white text-base font-medium tracking-tight">
          Solved Questions
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          <b> Quote of the day : </b> <i>"He who thinks he can and he who thinks who can't are both usually right."</i>
        </p>
      </div>
    </div>
  )
}
