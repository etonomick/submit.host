import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function Toggle({ state = false }) {

    const [enabled, setEnabled] = useState(state)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}