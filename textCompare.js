// events

function buttonCompareClicked()
{		
	var textBefore = document.getElementById("Ltext").value;
	var textAfter = document.getElementById("Rtext").value;

	var differences = Differences.findDifferencesBetweenStrings
	(
		textBefore,
		textAfter
	);

	var differencesAsString = differences.toString();

	var textareaDifferences = document.getElementById
	(
		"textareaDifferences"
	);
	textareaDifferences.innerHTML = differencesAsString;
	
}

// extensions

function ArrayExtensions()
{
	// extension class
}
{
	Array.prototype.insertElementAt = function(element, index)
	{
		this.splice(index, 0, element);
	}

	Array.prototype.insertElementsAt = function(elements, index)
	{
		for (var i = 0; i < elements.length; i++)
		{
			this.splice(index + i, 0, elements[i]);
		}
	}

	Array.prototype.removeAt = function(index)
	{
		this.splice(index, 1);
	}
}

// classes

function Differences(passagePairs)
{
	this.passagePairs = passagePairs;
}
{
	// static methods

	Differences.findDifferencesBetweenStrings = function(string0, string1)
	{
		var passagePairsAll = [];

		var passagePairsMatching = Differences.findPassagePairsMatchingBetweenStrings
		(
			string0, string1, [ 0, 0 ]
		);

		Differences.insertPassagePairsDifferentBetweenMatching
		(
			string0,
			string1,
			passagePairsMatching,
			passagePairsAll
		);

		var returnValue = new Differences(passagePairsAll);

		return returnValue;
	}

	Differences.findPassagePairsMatchingBetweenStrings = function
	(
		string0, string1, positionOffsets
	)
	{
		var passagePairsMatching = [];

		var longestCommonPassagePair = Differences.findLongestCommonPassagePair
		(
			string0, 
			string1
		);

		var longestCommonPassageText = longestCommonPassagePair.passages[0].text;
		var lengthOfCommonPassage = longestCommonPassageText.length;

		if (lengthOfCommonPassage == 0)
		{
			return passagePairsMatching;	
		}

		passagePairsMatching.push(longestCommonPassagePair);

		var passages = longestCommonPassagePair.passages;
		var passage0 = passages[0];
		var passage1 = passages[1];

		var passagePairsMatchingBeforeCommon = Differences.findPassagePairsMatchingBetweenStrings
		(
			string0.substr(0, passage0.position),
			string1.substr(0, passage1.position),
			[
				positionOffsets[0], 
				positionOffsets[1]
			]
		);

		var passagePairsMatchingAfterCommon = Differences.findPassagePairsMatchingBetweenStrings
		(
			string0.substr
			(
				passage0.position + lengthOfCommonPassage
			),
			string1.substr
			(
				passage1.position + lengthOfCommonPassage
			),
			[
				positionOffsets[0] 
					+ passage0.position 
					+ lengthOfCommonPassage,

				positionOffsets[1] 
					+ passage1.position 
					+ lengthOfCommonPassage
			]
		);

		var passagePairSetsMatchingBeforeAndAfter = 
		[
			passagePairsMatchingBeforeCommon,
			passagePairsMatchingAfterCommon
		];

		for (var i = 0; i < passagePairSetsMatchingBeforeAndAfter.length; i++)
		{
			var passagePairsToInsert = passagePairSetsMatchingBeforeAndAfter[i];
			passagePairsMatching.insertElementsAt
			(			
				passagePairsToInsert,
				(i == 0 ? 0 : passagePairsMatching.length)
			);
		}

		for (var i = 0; i < longestCommonPassagePair.passages.length; i++)
		{
			var passage = longestCommonPassagePair.passages[i];
			passage.position += positionOffsets[i];
		}

		return passagePairsMatching;
	}

	Differences.findLongestCommonPassagePair = function(string0, string1)
	{
		var passage0 = new Passage("", 0);
		var passage1 = new Passage("", 0);

		var returnValue = new PassagePair
		(
			true, // doPassagesMatch
			[
				passage0, passage1
			]
		);

		var lengthOfString0 = string0.length;
		var lengthOfString1 = string1.length;

		var substringLengthsForRow = null;
		var substringLengthsForRowPrev;

		var lengthOfLongestCommonSubstringSoFar = 0;
		var longestCommonSubstringsSoFar = "";
		var cellIndex = 0;

		// Build a table whose y-axis is chars from string0,
		// and whose x-axis is chars from string1.
		// Put length of the longest substring in each cell.

		for (var i = 0; i < lengthOfString0; i++)
		{
			substringLengthsForRowPrev = substringLengthsForRow;
			substringLengthsForRow = [];

			for (var j = 0; j < lengthOfString1; j++)
			{
				if (string0[i] != string1[j])
				{
					substringLengthsForRow[j] = 0;
				}
				else 
				{
					var cellValue;

					if (i == 0 || j == 0)
					{
						// first row or column
						cellValue = 1;
					}
					else
					{
						// Copy cell to upper left, add 1.
						cellValue = substringLengthsForRowPrev[j - 1] + 1;
					}

					substringLengthsForRow[j] = cellValue;

					if (cellValue > lengthOfLongestCommonSubstringSoFar)
					{
						lengthOfLongestCommonSubstringSoFar = cellValue;
						var startIndex = i - lengthOfLongestCommonSubstringSoFar + 1;
						var longestCommonSubstringSoFar = string0.substring // not "substr"!
						(
							startIndex, 
							i + 1
						);

						passage0.text = longestCommonSubstringSoFar;
						passage0.position = startIndex;

						passage1.text = longestCommonSubstringSoFar;
						passage1.position = j - lengthOfLongestCommonSubstringSoFar + 1;
					}
				}
			}
		}

		return returnValue;
	}

	Differences.insertPassagePairsDifferentBetweenMatching = function
	(
		string0,
		string1,
		passagePairsToInsertBetween,
		passagePairsAll
	)
	{	
		passagePairsToInsertBetween.insertElementAt
		(
			new PassagePair
			(
				true, // doPassagesMatch
				[
					new Passage("", 0),
					new Passage("", 0)
				]
			),
			0
		);

		passagePairsToInsertBetween.push
		(
			new PassagePair
			(
				true, // doPassagesMatch
				[
					new Passage("", string0.length),
					new Passage("", string1.length)
				]
			)
		);

		var pMax = passagePairsToInsertBetween.length - 1;

		for (var p = 0; p < pMax; p++)
		{
			passagePairToInsertAfter = passagePairsToInsertBetween[p];
			passagePairToInsertBefore = passagePairsToInsertBetween[p + 1];

			Differences.buildAndInsertPassagePairBetweenExisting
			(
				string0,
				string1,
				passagePairToInsertBefore,
				passagePairToInsertAfter,
				passagePairsAll
			);

			passagePairsAll.push(passagePairToInsertBefore);
		}

		var indexOfPassagePairFinal = passagePairsAll.length - 1;

		var passagePairFinal = passagePairsAll[indexOfPassagePairFinal];

		if 
		(
			passagePairFinal.doPassagesMatch == true 
			&& passagePairFinal.passages[0].text.length == 0
		)
		{
			passagePairsAll.removeAt(indexOfPassagePairFinal, 1);
		}
	}

	Differences.buildAndInsertPassagePairBetweenExisting = function
	(
		string0, 
		string1, 
		passagePairToInsertBefore, 
		passagePairToInsertAfter,
		passagePairsAll
	)
	{
		var lengthOfPassageToInsertAfter = passagePairToInsertAfter.passages[0].text.length;

		var positionsForPassagePairDifferent = 
		[
			[
				passagePairToInsertAfter.passages[0].position 
					+ lengthOfPassageToInsertAfter,

				passagePairToInsertAfter.passages[1].position 
					+ lengthOfPassageToInsertAfter
			],			
			[
				passagePairToInsertBefore.passages[0].position,
				passagePairToInsertBefore.passages[1].position
			]			
		];

		var passageToInsert0 = 	new Passage
		(
			string0.substring // not "substr"!
			(
				positionsForPassagePairDifferent[0][0], 
				positionsForPassagePairDifferent[1][0]
			),
			positionsForPassagePairDifferent[0][0]
		);

		var passageToInsert1 = new Passage
		(
			string1.substring  // not "substr"!
			(
				positionsForPassagePairDifferent[0][1], 
				positionsForPassagePairDifferent[1][1]
			),
			positionsForPassagePairDifferent[0][1]
		);

		var passagePairToInsert = new PassagePair
		(
			false, // doPassagesMatch
			[
				passageToInsert0,
				passageToInsert1
			]
		);

		if 
		(
			passagePairToInsert.passages[0].text.length > 0
			|| passagePairToInsert.passages[1].text.length > 0
		)
		{
			passagePairsAll.push(passagePairToInsert);
		}

	}

	// instance methods

	Differences.prototype.toString = function()
	{
		var returnValue = "";

		for (var p = 0; p < this.passagePairs.length; p++)
		{
			var passagePair = this.passagePairs[p];
			var passagePairAsString = passagePair.toString();
			passagePairAsString = passagePairAsString.replace
			(
				
				"\n\r",
                "<br />",
			);

			returnValue += passagePairAsString;
		}

		return returnValue; 
	}	
}

function Passage(text, position)
{
	this.text = text;
	this.position = position;
}

function PassagePair(doPassagesMatch, passages)
{
	this.doPassagesMatch = doPassagesMatch;
	this.passages = passages;	
}
{
	PassagePair.prototype.toString = function()
	{
		var returnValue = "";

		if (this.doPassagesMatch == true)
		{
			returnValue = this.passages[0].text;
		}
		else
		{
			returnValue += "<mark style='background-color:red'>\n\r";
			returnValue += this.passages[0].text;
			returnValue += "</mark><mark style='background-color:yellow'>";
			returnValue += this.passages[1].text;
			returnValue += "</mark>"; 

		}

		return returnValue;
	}
}