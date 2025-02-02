import { Router } from 'express';
const router = Router();


/**
 * @route   POST /api/tournament/create
 * @desc    
 * @access  
 * @req     
 * @res          
 */

router.post("/create", (req, res) => {

})

/**
 * @route   GET /api/tournament/:tournamentId
 * @desc    
 * @access  
 * @req     
 * @res          
 */

router.get("/:tournamentId", (req, res) => {

})

/**
 * @route   GET /api/tournament/:tournamentId/fixture
 * @desc    
 * @access  
 * @req     
 * @res          
 */

router.get("/:tournamentId/fixture", (req, res) => {

})

/**
 * @route   POST /api/tournament/:tournamentId/start
 * @desc    
 * @access  
 * @req     
 * @res          
 */

router.post("/:tournamentId/start", (req, res) => {

})

export default router;