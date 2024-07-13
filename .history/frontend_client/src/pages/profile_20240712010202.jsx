import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  PaperClipIcon
} from "@heroicons/react/24/solid";
import axios from 'axios';

export function Profile() {
  const email = sessionStorage.username;
  const response = axios.post("http://localhost:3001/api/accountInfo", { email })
  return (
    <>
       <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen pb-24 bg-gray-500">
          <p>  </p>
      </div>
    </>
  );
}

export default Profile;
