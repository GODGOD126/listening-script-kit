import json
from pathlib import Path
from fractions import Fraction
leap=lambda y:y%4==0 and (y%100!=0 or y%400==0)
count=sum(leap(y) for y in range(1,401))
result={'skippedDateLabels':list(range(5,15)),'labelDifference':15-4,'skippedLabelCount':len(range(5,15)),'annualApproximateDriftDays':0.0078,'approximateDriftSeconds':0.0078*86400,'leapYearsPer400':count,'averageGregorianYearDays':float(Fraction(365*400+count,400)),'examples':{str(y):leap(y) for y in [1600,1900,2000,2024,2100]},'scope':'Independent arithmetic under stated rules; not proof of any jurisdiction historical adoption or human impact'}
assert result['skippedLabelCount']==10 and result['leapYearsPer400']==97
assert result['averageGregorianYearDays']==365.2425
Path(__file__).with_name('calendar-arithmetic-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps(result,ensure_ascii=False))
