import Container from "@/components/container/Container";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import Payment from "./Payments/Payment";
import useLoadUserBadge from "@/hooks/useLoadUserBadge";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Membership = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [badgeData, refetchBadge, isBadgeLoading] = useLoadUserBadge()
    console.log(badgeData)
    if (isBadgeLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <Container>
            <Helmet>
                <title>CF | Membership</title>
            </Helmet>
            <div className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-8 mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Pricing Plan</h1>

                    <p className="max-w-2xl mx-auto mt-4 text-center text-gray-800 xl:mt-6 dark:text-gray-300">
                        Purchase membership now and get all the premium facility. Premium membership has no limitation. An user can post and comment without any limit. Start today and enjoy full freedom to access all the services.
                    </p>

                    <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 ">
                        <div className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                            <p className="font-medium text-gray-700 uppercase dark:text-gray-300">Bronze</p>

                            <h2 className="text-4xl font-semibold text-gray-800 uppercase dark:text-gray-100">
                                $0
                            </h2>

                            <ul className="space-y-2">
                                <li className="flex ">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Life time</p>
                                </li>
                                <li className="flex">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Limited Post Facility </p>
                                </li>
                                <li className="flex">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-c-primary w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Limited comments</p>
                                </li>
                            </ul>

                            <button disabled className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize bg-c-primary rounded-lg">
                                {badgeData?.badge === "bronze" ? "Current Plan" : "Not Applicable"}
                            </button>
                        </div>


                        <div className="w-full p-8 space-y-8 text-center bg-blue-600 rounded-lg">
                            <p className="font-medium text-gray-200 uppercase">Gold</p>

                            <h2 className="text-5xl font-bold text-white uppercase dark:text-gray-100">
                                $40
                            </h2>

                            <ul className="space-y-2">
                                <li className="flex ">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className=" w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-300 dark:text-gray-300">Life time</p>
                                </li>
                                <li className="flex">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-200 dark:text-gray-300">Unlimited Post Facility </p>
                                </li>
                                <li className="flex">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className=" w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                    <p className="font-medium text-gray-200 dark:text-gray-300">Unlimited comments</p>
                                </li>
                            </ul>

                            <button onClick={handleOpen} disabled={badgeData?.badge === 'gold'} className="w-full px-4 py-2 mt-10 tracking-wide text-blue-500 capitalize bg-white rounded-lg">
                                {badgeData?.badge === "gold" ? "Current Plan" : "Start Now"}
                            </button>
                        </div>


                    </div>
                </div>
            </div>


            <Dialog open={open} handler={handleOpen} className="py-10 px-5">
                <DialogHeader className="flex justify-center ">Purchase Gold Badge</DialogHeader>
                <DialogBody>
                    <Payment handleOpen={handleOpen} refetchBadge={refetchBadge}></Payment>
                </DialogBody>
                <DialogFooter>
                    <button
                        onClick={handleOpen}
                        className="hover:bg-red-600 mr-1 bg-red-500 py-2 px-3 rounded-md text-white"
                    >
                        <span>Close</span>
                    </button>
                </DialogFooter>
            </Dialog>

        </Container>
    );
};

export default Membership;