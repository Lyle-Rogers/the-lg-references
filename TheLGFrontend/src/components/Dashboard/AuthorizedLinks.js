import React from "react";

import DashboardHome from "../../screens/private/DashboardHome";
import Blog from "../../screens/private/Blog/Blog";
import Petitions from "../../screens/private/Petitions";
import Directory from "../../screens/public/directory/Directory";
import BusinessPage from "../../screens/private/BusinessPage/BusinessPage";
import Exchange from "../../screens/public/Exchange";
import Contact from "../../screens/private/Contact";
import News from "../../screens/private/News/News";
import ChantelleNews from "../../screens/private/News/ChantelleNews";
import YandriNews from "../../screens/private/News/YandriNews";
import FirstBornTribeNews from "../../screens/private/News/FirstBornTribeNews";
import BusinessNews from "../../screens/private/News/BusinessNews";
import Admin from "../../screens/private/Admin/Admin";
import requireAdmin from "../HOC/requireAdmin";
import BlogDetails from "../../screens/private/Blog/BlogDetails";
import Profile from "../../screens/private/Profile";
import NewSubscription from "../../screens/private/Subscription/NewSubscription";
import AreYouVotingForAmmonForm from "../../screens/private/Petitions/AmmonPetition";
import DoYouHaveACredencial from "../../screens/private/Petitions/CredencialPetition";
import RepresentativeForm from "../../screens/private/Petitions/RepresentativeForm";
import SecurityPetition from "../../screens/private/Petitions/SecurityPetition";
import Groups from "../../screens/private/Groups/Groups";
import JoinGroup from "../../screens/private/Groups/JoinGroup";
import CreateGroup from "../../screens/private/Groups/CreateGroup";
import AdminBusinessPage from "../../screens/private/Admin/AdminBusinessPage/AdminBusinessPage";
import Calendar from "../../screens/private/Calendar/Calendar";
import RaffleCheckout from "../../screens/private/raffle/RaffleCheckout";
import RaffleCheckoutSuccess from "../../screens/private/raffle/RaffleCheckoutSuccess";
import YouthOfIsrael from "../../screens/private/YOI/YOI";
import AssistantForm from "../../screens/private/YOI/AssistantForm";
import ChildForm from "../../screens/private/YOI/ChildForm";
import ChildFormSuccess from "../../screens/private/YOI/ChildFormSuccess";
import Classifieds from "../../screens/private/Classifieds/Items/Classifieds";
import ClassifiedsItem from "../../screens/private/Classifieds/Items/ClassifiedsItem";
import ClassifiedsVehicles from "../../screens/private/Classifieds/Vehicles/ClassifiedsVehicles";
import ClassifiedsVehicleListing from "../../screens/private/Classifieds/Vehicles/ClassifiedsVehicleListing";
import ClassifiedsCreate from "../../screens/private/Classifieds/Misc/ClassifiedsCreate";
import ClassifiedsCreateListing from "../../screens/private/Classifieds/Misc/ClassifiedsCreateListing";
import MyClassifieds from "../../screens/private/Classifieds/Misc/MyClassifieds";
import EditClassified from "../../screens/private/Classifieds/Misc/EditClassified";
import ClassifiedFavorites from "../../screens/private/Classifieds/Misc/ClassifiedFavorites";
import HomePrivate from "../../screens/private/Home";
import Forum from "../../screens/private/Forum/Forum";
import { Route, Switch } from "react-router";
import ForumPost from "../../screens/private/Forum/ForumPost";
import MyTickets from "../../screens/private/raffle/MyTickets";

const AuthLinks = ({ match }) => {
  const { path, url} = match;
  return (
    <Switch>
      <Route exact path={`${path}`} component={DashboardHome} />
      <Route exact path={`${path}/home`} component={HomePrivate} />
      <Route path={`${path}/calendar`} component={Calendar} />
      <Route exact path={`${path}/classifieds`} component={Classifieds} />
      <Route
        exact
        path={`${path}/classifieds/create`}
        component={ClassifiedsCreate}
      />
      <Route
        exact
        path={`${path}/classifieds/create-listing/:type`}
        component={ClassifiedsCreateListing}
      />
      <Route
        exact
        path={`${path}/classifieds/vehicles`}
        component={ClassifiedsVehicles}
      />
      <Route
        exact
        path={`${path}/classifieds/item/:itemId`}
        component={ClassifiedsItem}
      />
      <Route
        exact
        path={`${path}/classifieds/vehicles/:itemId`}
        component={ClassifiedsVehicleListing}
      />
      <Route
        exact
        path={`${path}/classifieds/myClassifieds`}
        component={MyClassifieds}
      />
      <Route
        exact
        path={`${path}/classifieds/edit-listing/:type/:id`}
        component={EditClassified}
      />
      <Route 
        exact 
        path={`${path}/classifieds/favorites`} 
        component={ClassifiedFavorites} 
      />

      <Route exact path={`${path}/profile`} component={Profile} />
      <Route path={`${path}/newSubscription`} component={NewSubscription} />
      <Route path={`${path}/blog`} component={Blog} />
      <Route path={`${path}/blogDetails/:blogId`} component={BlogDetails} />
      <Route exact path={`${path}/petitions`} component={Petitions} />
      <Route
        path={`${path}/petitions/Ammon`}
        component={AreYouVotingForAmmonForm}
      />
      <Route
        path={`${path}/petitions/Credencial`}
        component={DoYouHaveACredencial}
      />
      <Route
        path={`${path}/petitions/Representative`}
        component={RepresentativeForm}
      />
      <Route path={`${path}/petitions/Security`} component={SecurityPetition} />

      <Route path={`${path}/groups`} component={Groups} />
      <Route path={`${path}/joinGroup`} component={JoinGroup} />
      <Route path={`${path}/createGroup`} component={CreateGroup} />

      <Route path={`${path}/directory`} component={Directory} />
      <Route path={`${path}/businessPage/:pageId`} component={BusinessPage} />
      <Route path={`${path}/exchange`} component={Exchange} />
      <Route path={`${path}/contact`} component={Contact} />
      <Route exact path={`${path}/news`} component={News} />
      <Route path={`${path}/news/Chantelle`} component={ChantelleNews} />
      <Route path={`${path}/news/Yandri`} component={YandriNews} />
      <Route path={`${path}/news/FBT`} component={FirstBornTribeNews} />
      <Route path={`${path}/news/Business`} component={BusinessNews} />
      <Route exact path={`${path}/YOI`} component={YouthOfIsrael} />
      <Route path={`${path}/YOI/assistant`} component={AssistantForm} />
      <Route path={`${path}/YOI/register`} component={ChildForm} />

      <Route path={`${path}/community`} component={Forum} />
      <Route path={`${path}/communityPost/:postId`} component={ForumPost} />

      <Route
        path={`${path}/YOI/register-success`}
        component={ChildFormSuccess}
      />
      <Route exact path={`${path}/admin`} component={requireAdmin(Admin)} />
      <Route
        path={`${path}/admin/businessPage/:pageId`}
        component={requireAdmin(AdminBusinessPage)}
      />
      <Route exact path={`${path}/raffle`} component={RaffleCheckout} />
      <Route
        path={`${path}/raffle/success`}
        component={RaffleCheckoutSuccess}
      />
      <Route path={`${path}/raffle/MyTickets`} component={MyTickets} />
    </Switch>
  );
};

const UnAuthLinks = ({ match }) => {
  const { path, url} = match;
  return (
    <Switch>
      <Route exact path={`${path}`} component={DashboardHome} />
      <Route exact path={`${path}/home`} component={HomePrivate} />
      <Route path={`${path}/profile`} component={Profile} />
      <Route path={`${path}/newSubscription`} component={NewSubscription} />
      <Route exact path={`${path}/raffle`} component={DashboardHome} />
      <Route path={`${path}/raffle/success`} component={DashboardHome} />

      <Route path={`${path}/blog`} component={DashboardHome} />
      <Route path={`${path}/blogDetails/:blogId`} component={BlogDetails} />
      <Route path={`${path}/petitions`} component={DashboardHome} />
      <Route path={`${path}/directory`} component={DashboardHome} />
      <Route path={`${path}/businessPage/:pageId`} component={DashboardHome} />
      <Route path={`${path}/exchange`} component={DashboardHome} />
      <Route path={`${path}/contact`} component={DashboardHome} />
      <Route exact path={`${path}/news`} component={DashboardHome} />
      <Route path={`${path}/news/Chantelle`} component={DashboardHome} />
      <Route path={`${path}/news/Yandri`} component={DashboardHome} />
      <Route path={`${path}/news/FBT`} component={DashboardHome} />
      <Route path={`${path}/news/Business`} component={DashboardHome} />
      <Route path={`${path}/YOI`} component={DashboardHome} />
      <Route path={`${path}/community`} component={DashboardHome} />
      <Route path={`${path}/communityPost`} component={DashboardHome} />
    </Switch>
  );
};

export { AuthLinks, UnAuthLinks };
