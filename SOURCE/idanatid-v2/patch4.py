# patch4 : accroche de l'accueil + retrait des commandes pause/précédent/suivant du carrousel (idempotent)
import re
def rw(p,f):
    s=open(p,encoding='utf-8').read(); t=f(s); open(p,'w',encoding='utf-8').write(t); return s!=t
# 1. commandes vidéo du carrousel
rw('build2.py',lambda s:re.sub(r'<div class="sctl".*?id="scNext">.*?</button></div>','',s,flags=re.S))
# 2. accroche (deux lignes de titre, deux lignes de sous-titre)
def home(s):
    s=s.replace("ttl:{he:['האתר שלכם','באוויר'],fr:['Votre site','en ligne']},","ttl:{he:['אתרים ואפליקציות','לכל עסק.'],fr:['Sites web et applications','pour chaque entreprise.']},")
    s=s.replace("tag:{he:['תכננו,','השיקו'],fr:['Planifiez,','lancez']},","tag:{he:['מהעסק הכי קטן ועד הכי גדול,','במחיר שנקבע מראש.'],fr:['Du plus petit commerce','à la plus grande entreprise.']},")
    s=s.replace("ttl:{he:['אתר שעובד','בשביל העסק שלכם'],fr:['Un site qui travaille','pour votre activité']},","ttl:{he:['אתרים ואפליקציות','לכל עסק.'],fr:['Sites web et applications','pour chaque entreprise.']},")
    s=s.replace("ttl:{he:['תנו ללקוחות','סיבה להתקשר.'],fr:['Donnez à vos clients','une raison d’appeler.']},","ttl:{he:['אתרים ואפליקציות','לכל עסק.'],fr:['Sites web et applications','pour chaque entreprise.']},")
    s=s.replace("tag:{he:['מחיר ידוע מראש.','האתר שלכם לגמרי.'],fr:['Prix annoncé d’avance.','Site à vous, entièrement.']},","tag:{he:['מהעסק הכי קטן ועד הכי גדול,','במחיר שנקבע מראש.'],fr:['Du plus petit commerce','à la plus grande entreprise.']},")
    # le carrousel s'arrête aussi quand le focus clavier est dedans
    s=s.replace("!(($('sc')||{}).matches&&$('sc').matches(':hover'))","!(($('sc')||{}).matches&&($('sc').matches(':hover')||$('sc').contains(document.activeElement)))")
    return s
rw('assets/home.js',home)
rw('assets/app.js',lambda s:s.replace('h1:"האתר שלכם באוויר תוך 5-30 ימי עבודה, במחיר שנקבע מראש.",','h1:"אתרים ואפליקציות לכל עסק, מהקטן ביותר ועד הגדול ביותר. מוכן תוך 5 עד 30 ימי עבודה, במחיר שנקבע מראש.",'))
# 3. déclaration d'accessibilité : dire ce qui existe vraiment
def a11y(s):
    s=s.replace("<li>קרוסלות ומחוונים עם כפתורי הקודם, הבא והשהיה שאפשר להפעיל גם במקלדת.</li>","<li>הקרוסלה בדף הבית נעצרת כשהעכבר או מיקוד המקלדת עליה, ונשארת קבועה אם המכשיר שלכם מבקש להפחית אנימציות. נקודות מאפשרות לבחור שקופית.</li>")
    s=s.replace("<li>Carrousels et curseurs avec boutons précédent, suivant et pause utilisables au clavier.</li>","<li>Le carrousel de l’accueil se met en pause au survol et au focus clavier, et reste fixe si votre appareil demande de réduire les animations. Des points permettent de choisir une diapositive.</li>")
    s=s.replace("<li>הרקע המונפש משנה צבעים","<li>הקרוסלה בדף הבית מתחלפת אוטומטית ואין בה כפתור עצירה ייעודי.</li>\n<li>הרקע המונפש משנה צבעים",1)
    s=s.replace("<li>Le fond animé change de couleurs","<li>Le carrousel de l’accueil change de diapositive automatiquement et n’a pas de bouton de pause dédié.</li>\n<li>Le fond animé change de couleurs",1)
    return s
rw('accessibility.html',a11y)
css=open('new.css',encoding='utf-8').read()
if '/*p4*/' not in css:
    open('new.css','a',encoding='utf-8').write('\n/*p4*/@media(min-width:641px){.hero2 .hb{padding-bottom:5.5rem}}\n')
print('patch4 ok')
