import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Marks from '../components/Marks'
import StudentHeader from '../components/StudentHeader';
import InnerHeader from '../components/InnerHeader';


const MarksScreen = () => {
    return (
        <>
            <StudentHeader/>
            <InnerHeader/>
            <Marks />
        </>
      );
    }
export default MarksScreen