# What
Most of us would make our world better if we could. Or at least different. 

## Politics

For example, you would vote that tiny progressive political party, if you knew your vote would matter. So let's get to work to make it matter. Don't waste your vote until you know there is a mass large enough to make it count. 

## Consumers

The same principle applies to pressuring corporations by boycotts, or, more widely, changing consumer habits. If you choose to buy the more ethical brand every time, you'll soon be out of money, and the less ethical brand will still be going strong, but if enough people focus on the same issue at the same time, changes happen. In our current society, this is only achieved in extraordinary cases, but now, with almost everyone on-line, we can make it the norm.

## Companies

The same issue exists on the companies side. If there isn't a long-term pressure from customers to change, then, for example, choosing a more ethical supplier and raising prices only means shelling money out of their own pocket while another company moves into the empty space and voids their effort. 

# How
Express your support for cause. Express under what conditions are you willing to invest the energy. I will only switch to the more expensive, more ethical brand if 10000 other people do. Express it in a way that computer can understand it. 


## How to reach critical mass
### 1
First, the website has to be finished and polished. And ideally a mobile app too. 
### 2
Some worthwhile causes should be collected, as examples, to give people reason to click around and share.
### 3
An issue that already reached good critical mass has to be identified. Something that would benefit from additional coordination. An example from Czech Republic is the 2019 event of 250 000 people gathering to protest against prime minister Babiš, and to block the many products of His Agrofert holding. A reasonably sized effort also happened outside of streets and social media, for example a chrome extension that helps online shoppers avoid Agrofert's products. Eventually the momentum all but died out, without effect. I postulate that things would have evolved differently if each of those 250 000 people that gathered would be introduced to the application and encouraged to coordinate through it. I postulate that the biggest obstacle to an individual's effort is this lack of confidence in other's sustained effort, and by extension, each of us includes this shared lack of confidence in our calculations.


## extensibility, decentralization
this is an open protocol. If you are tech-saavy, you are encouraged to:
*  publish your own statements of participation
(todo: link to the ontology, to some generator, etc)
* extend the data scheme of participation conditions
currently, the only method of specifying your conditions is the "number of others willing to participate" (todo: fill in the actual rdf predicate name), which more precisely means: "number of others whose number of others willing to participate has been reached". And these "others", precisely, are other users who expressed their identify by logging into * website with their google/facebook/etc account. At some point, a need may arise to have somebody:
* estimate how many of these accounts belong to real people
* estimate how many people are already commited and participating outside of this platform
* expressed their intent to participate through other similar platforms
etc.

# current status
mocking up the app: https://koordinator.knack.com/koordinator#campaigns/


# condition language/ontology:
	condition := condition or condition
	condition := condition and condition
	condition := number of participants
	condition := number of confirmed participants
	condition := number of estimated participants
	

### "number of participants":
	```
	total number of participants whose "number of participants" have been met.
	determined by:
		given a list of thresholds
		sort the list from lowest to highest
		for idx starting with len(list) - 1 and ending at 0:
			threshold = list[idx]
			#number of other supporters is the count of remaining items whose threshold <= threshold
			num_supporters = 0
			for idx2 starting with len(list) - 2 and ending at 0:
				if list[idx2] <= threshold:
					num_supporters += 1
			if num_supporters >= threshold:
				return idx
	```
			
### "number of confirmed participants":
	```
	given a list of participation statements:
		if confirmed is true:
			sum += 1
	if sum >= threshold:
		alert user, ask for confirmation of participation, set confirmed to true
	```
		

### "number of estimated participants":
	```
	estimation would initially be in hands of the user that created the campaign
	```

# the data schema/ontology in detail
Location:
	a string or an uri or possibly some api-specific identifier
	not sure if there is any free ontology or service we can use to autocomplete and disambiguate.
	possibly: https://cloud.google.com/maps-platform/places
	may be helpful but lacks details: https://bioportal.bioontology.org/ontologies/GEO
	user location can have default value obtained through browser Geolocation API or ip geolocation:
		https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
		https://medium.com/@ipdata_co/what-is-the-best-commercial-ip-geolocation-api-d8195cda7027

Campaign_description:
	content: Prose
	timestamp: Datetime
	created_by: User

Campaign:
	Campaign describes an action or set of actions that each participant can take, and goals or possible results.
	
	relevant_to_location: Location,	can be specified multiple times
	created: Datetime
	owner: User
	picture: file path?
	title: string
	description: Campaign_description
	
kinds of participation proclamations:
	Participation upon notice:
		the simplest kind. You proclaim that you'll start participating as soon as there is an X number of other participants. You will be alerted when this becomes the case. You can always amend or retract your proclamation.
	maybe we should initially stick to just this kind.
	
	Basic participation proclamation:
		Number of people: int
			this may be the simplest way to include for example a spouse or a friend
		
		

# bullet-points for UI design
```
pages/windows:

	landing/welcome page:
		lists let's say 3 campaigns ordered by "landing page order". determined by:
			"featuredness": an int property of Campaign, set by site admin in the db
			user location
					
		show featured campaigns. Ideally would be smart enough to select what's featured based on user location.

	browse causes (serves as home page):
		sorting:
			by datetime (added to local db):

		tbd later:
			filtering:
				location-specific causes: (lists all causes related to a location)
					countries, cities

			fulltext search
		
--

	cause detail:
		title
		location
		description
		references?
		event datetime (if applicable)
		author
		supporters:
			name
			threshold
	
--

	add/edit cause:
	
--

	my support:
		cause: (title/link) (for example: "start buying l'oreal products")
		conditions:
		my identity:
			choices:
				* anonymous
				* nickname
				* facebook profile (can trigger login)
			privacy:
				* public
				* only known to this pod
		how to be notified when threshold is reached:
	
--

	condition object:
		(administered by cause author or site admin..)
		types:
			* threshold (number of active supporters so far) (can initially be processed fully automatically)
			* event/observation:
				(only plaintext for now, for example: "l'oreal stops testing on animals")
		state:
			* fulfilled
			* unfulfilled
			
--

	support koordinator (tbd later):
		
--
```

# sources of campaigns to add, causes to support:
https://causes.com/actions/1805436-donate-to-provide-solar-power-to-indigenous-communities-in-the-amazon
https://www.ethicalconsumer.org/ethicalcampaigns/boycotts
https://github.com/aindilis/elle-ethical-consumer/blob/master/sample.xml
https://www.reddit.com/r/Anticonsumption/
https://www.reddit.com/r/Futurology/comments/da0214/the_35_rule_states_any_movement_that_gains_35_of/
https://github.com/yacy/yacy_search_server/issues/314


# related sw
https://github.com/researchstudio-sat/webofneeds
https://github.com/peta-pico/debate-nanopubs





# testcases that it makes sense to coordinate in small numbers of people
flashmobs
popularization of koordinator
cooperative testcases


# resources & related projects


https://theconversation.com/climate-crisis-we-are-not-individuals-fighting-a-faceless-system-we-are-the-system-that-needs-to-change-129513

https://airtable.com/shrVDkswEnsgA87yS

https://csarven.ca/linked-research-decentralised-web

https://thezvi.wordpress.com/2020/01/16/how-escape-from-immoral-mazes/

maslo.cz

https://github.com/TheDataRideAlongs/ProjectDomino



# todo

* continue sketching out the format of "statements"
* make the coordinator fetch statements from known places, evaluate them, inform user of reached critical massess.

* work out an "estimate" format.
** I might be estimating that 54684 are already participating in the campaign, outside of/including information i have available by collecting statements with my crawler, and outside of/including estimates provided by others.

* collect published boycotts and other usecases
* automate generating and publishing statements of participation: 
** for example, i support everything that stoopkid supports, just with 10x higher limit 
** i support every ethicalconsumer boycott, but i will only provide my limit upon (automatic?) request

* ????
* no profit.

