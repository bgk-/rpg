function ApplicationManager()
{
    this.startupApplicationManager = function()
    {
        this.narshe = new map().startupMap(testmap, 0, 0, 1, 2560, 1600, 1);
        this.Alasdair = new Player().startupPlayer(100, 1400);
        
        this.Alasdair.map = this.narshe;
        this.narshe.player = this.Alasdair;
        return this;
        
    };
}