
<!--
   <q-list bordered padding>
      <q-item>
        <q-item-section top avatar>
          <!-- <q-avatar rounded> -->
            <img style="max-width:200px;max-height:200px" src="statics/photos/ID2.jpg">
          <!-- </q-avatar> -->
        </q-item-section>

        <q-item-section>
         <q-item-label> <div class="text-h6">{{ searchResults["ID1"].firstName}} {{searchResults['ID1'].lastName}}( {{ Object.keys(searchResults)[0] }})</div></q-item-label>
          <q-item-label > Date of Birth : {{ searchResults["ID1"].dateOfBirth}} || Age : {{ searchResults["ID1"].age}} </q-item-label>
          <q-item-label > Age : {{ searchResults["ID1"].age}} years </q-item-label>
          <q-item-label > Height : {{searchResults["ID1"].height}} </q-item-label>
          <q-item-label > Marital Status : {{searchResults["ID1"].maritalStatus}} </q-item-label>
          <q-item-label > Location : {{ searchResults["ID1"].city}}, {{ searchResults["ID1"].state}}, {{ searchResults["ID1"].country}}  </q-item-label>
          <q-item-label > About {{ searchResults["ID1"].firstName}} : {{searchResults["ID1"].aboutYourself}} </q-item-label>
         <q-expansion-item
         switch-toggle-side
        expand-separator
        caption="Click for more details"
        dense
        dense-toggle
         >

        <q-card>
          <q-card-section>
          <q-item-section>
          <q-item-label > Father Name  : {{searchResults["ID1"].fatherName}} </q-item-label>
          <q-item-label > Gotra  : {{searchResults["ID1"].gotra}} </q-item-label>
          <q-item-label > Original Surname  : {{searchResults["ID1"].originalSurname}} </q-item-label>
          <q-item-label > Address  : {{searchResults["ID1"].residentialAddress}} </q-item-label>
          <q-item-label > Primary Contact  : {{searchResults["ID1"].primaryContactCode}} - {{searchResults["ID1"].primaryContact}}  </q-item-label>
          <q-item-label > Alternate Contact  : {{searchResults["ID1"].alternateContactCode}} - {{searchResults["ID1"].alternateContact}}  </q-item-label>
          </q-item-section>
          </q-card-section>
        </q-card>

      </q-expansion-item>

        </q-item-section>

      </q-item>
       <q-separator spaced inset />
      <q-item>
        <q-item-section top avatar>
          <q-avatar size = "100px" rounded>
            <img src="https://cdn.quasar.dev/img/avatar3.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>meta</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    -->


        class="bg-primary text-white rounded-borders"

        <q-carousel-slide name="first2" class="column no-wrap flex-center">
            <img class="my-photo" style="max-width:200px;max-height:200px" :src="'statics/photos/' + profileID + '.jpg'">
        </q-carousel-slide>
        <q-carousel-slide name="second" class="column no-wrap flex-center">
            <img class="my-photo" style="max-width:200px;max-height:200px" src="statics/photos/nature.jpg">
        </q-carousel-slide>
