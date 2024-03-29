import { useLocation } from 'react-router-dom';  
import qs from 'qs';

const location = useLocation();  
const searchParams = new URLSearchParams(location.search);  
const query = qs.parse(searchParams.toString());