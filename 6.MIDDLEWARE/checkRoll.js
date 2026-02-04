import { useSyncExternalStore' } from "react";  

import express from "express";

const checkRole = (req, res, next) => {
    next();
}

export default checkRole;