wt cron schedule "0 * * * * *" GetEndpoints.js \
          --name getendpoints \
          --secret firebase_url=https://boiling-fire-9252.firebaseio.com/ \
					--secret firebase_secret=$FIREBASE_SECRET
